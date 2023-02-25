import { User } from "@models/users/User";
import { sequelize } from "@database/sequelize";
import { account } from "@models/Wallet/Account";
import { Op } from "sequelize";
import AxiosService from "../axios/AxiosService";

const walletRepository = sequelize.getRepository(account);
const userRespository = sequelize.getRepository(User);

class WalletService {
  // This method calls the Interflow Wallet API to create a new account
  async createWalletAccount() {
    try {
      const accountJob = await AxiosService.post("/accounts");
      return accountJob;
    } catch (error) {
      console.log("CONNECTION PROBLEM WITH INTERFLOW WALLET API");
    }
  }

  async getHealth() {
    try {
      const health = await AxiosService.get("/health/ready");
      return health;
    } catch (error) {
      console.log("CONNECTION PROBLEM WITH INTERFLOW WALLET API");
    }
  }

  // This method find a available account and set the user id to it
  // If there is 3 or less available account, it will create 3 new accounts
  // and then set the user id to one of them
  // If there is no available account, it will call itself again
  async setWalletAccountToUser(user: User): Promise<string> {
    let availableWalletsLength = (await this.getAllAvailableAccounts()).length;


    let wallet: account | null = null;

    wallet = await walletRepository.findOne({
      where: {
        interflow_user_id: null,
      },
    });

    //OUR IDEA IT'S TO ALWAYS HAVE AT LEAST 10 ACCOUNTS AVAILABLE
    //IF THERE IS LESS THAN 10 ACCOUNTS AVAILABLE, IT WILL CREATE 10 NEW ACCOUNTS
    try {
      if (availableWalletsLength <= 10) {
        if ((await this.getHealth()) != undefined) {
          let x = 0;
          while (x < 5) {
            console.log("Creating wallet account" + x);
            await this.createWalletAccount();
            x++;
          }
        } else {
          console.log(" -------- CONNECTION PROBLEM WITH INTERFLOW WALLET API -------- ");
        }
      }
    } catch (error) {
      console.log("ERROR ----", error);
    }

    try {
      

      console.log("WALLET FOUND!? ----", wallet)

      let x = 0;

      if (!wallet) {
        checkWalletExist();

        function checkWalletExist() {
          setTimeout(async function () {
            x++;
            const wallet = await walletRepository.findOne({
              where: {
                interflow_user_id: null,
              },
            });
            if (wallet) {
              console.log("WALLET FOUND!");
              await wallet.update({ interflow_user_id: user.dataValues.id });
              await user.update({ interflowAddress: wallet.dataValues.address });
              console.log(`WALLET ADDED TO USER! ${user.dataValues.id}`);
              return `WALLET ADDED TO USER! ${user.dataValues.id}`;
            } else {
              if (x < 5) {
                console.log("NULL WALLET FOUND NOT FOUND!");
                checkWalletExist();
              } else {
                console.log("FINISHED PROCESS ------------- WALLET NOT FOUND!");
                //We can add a function that call a notification system
                //To let admin know that there is no wallet available
                return "ADDRESS-ERROR";
              }
            }
          }, 5000);
        }
      } else {
        await wallet.update({ interflow_user_id: user.dataValues.id });
        await user.update({ interflowAddress: wallet.dataValues.address });
        console.log(`WALLET ADDED TO USER! ${user.dataValues.id}`);
        return wallet.address;
      }
    } catch (error) {
      await user.update({ interflowAddress: "NO-ADDRESS" });
      console.log(`WALLET ADDED TO USER! ${user.dataValues.id}`);
    }
  }

  async setWalletToUsersWithoutOne() {
    const usersWithoutWallet = await userRespository.findAll({
      where: {
        interflowAddress: "ADDRESS-ERROR",
      },
    });

    const wallets = await walletRepository.findAll({
      where: {
        interflow_user_id: null,
      },
    });

    //create a for of getting the index of the array
    //and then use the index to get the wallet
    for (let i = 0; i < usersWithoutWallet.length; i++) {
      if (wallets[i]) {
        await wallets[i].update({
          interflow_user_id: usersWithoutWallet[i].id,
        });
        await usersWithoutWallet[i].update({
          interflowAddress: wallets[i].address,
        });
        console.log(
          `WALLET ${wallets[i].address} ADDED TO USER! ${usersWithoutWallet[i].id}}`
        );
      } else {
        console.log("NO WALLET FOUND!");
      }
    }
  }

  async getAllJobs() {
    const jobs = await AxiosService.get("/jobs");
    return jobs;
  }

  async getAllWallets() {
    const wallets = await walletRepository.findAll();
    return wallets;
  }

  async getAllUsedWallets() {
    const wallets = await walletRepository.findAll({
      where: {
        interflow_user_id: {
          [Op.not]: null,
        },
      },
    });

    return wallets;
  }

  // This method returns the number of available accounts
  async getAllAvailableAccounts() {
    try {
      const walletsWithNullUserId = await walletRepository.findAll({
        where: {
          interflow_user_id: null,
        },
      });

      return walletsWithNullUserId;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new WalletService();
