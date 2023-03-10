import { Request, Response } from "express";
import UserService from "app/services/users/UserService";

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      let user = await UserService.login(req.body.authId, req.body.email);
      return res.status(200).json(user);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res
        .status(400)
        .json({ message: "There was a problem logging in." });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      let users = await UserService.findAllUsers();
      return res.status(200).json(users);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res
        .status(400)
        .json({ message: "There was a problem getting All Users." });
    }
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    try {
      let user = await UserService.findUserDataValue(req.params.id);
      return res.status(200).json(user);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const expoToken = req.body.expoToken;
    const dapperAddress = req.body.dapperAddress;
    const bloctoAddress = req.body.bloctoAddress;
    const newNickname = req.body.nickname;
    const newBgImage = req.body.bgImage;
    const newPfpImage = req.body.pfpImage;

    try {
      let user = await UserService.updateUser(req.params.id, {
        expoToken: expoToken,
        nickname: newNickname,
        bloctoAddress: bloctoAddress,
        dapperAddress: dapperAddress,
        bgImage: newBgImage,
        pfpImage: newPfpImage,
      });
      return res.status(200).json(user);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  public async getUserCollectionData(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      let user = await UserService.getAllUserCollections(req.params.id);
      return res.status(200).json(user);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  async getUserNFTs(req: Request, res: Response): Promise<Response> {
    try {
      let user = await UserService.getUserNfts(req.params.id);
      return res.status(200).json(user);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res.status(400).json({ message: "Invalid ID or no NFT in the user inventory" });
    }
  }

  public async followUnfollowUser(req: Request, res: Response): Promise<Response> {
    try {
      let user = await UserService.followUnfollowUser(
        req.params.id,
        req.body.userToFollowId
      );
      return res.status(200).json(user);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res
        .status(400)
        .json({ message: "Invalid ID to user or follower" });
    }
  }

  public async getFollowersData(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      let user = await UserService.getFollowersData(req.params.id);
      return res.status(200).json(user);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  public async getFollowingData(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      let following = await UserService.getFollowingData(req.params.id);
      return res.status(200).json(following);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  public async getExploreData(req: Request, res: Response): Promise<Response> {
    try {
      let exploreUsers = await UserService.getExploreData(req.params.id);
      return res.status(200).json(exploreUsers);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      let response = await UserService.deleteUser(req.params.id);
      return res.status(200).json(response);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res.status(400).json({ message: "Invalid ID" });
    }
  }

  public async getRanking(req: Request, res: Response): Promise<Response> {
    try {
      let user = await UserService.getRankingData();
      return res.status(200).json(user);
    } catch (err: any) {
      console.log('ERROR ---', err)
      return res.status(400).json({ message: "Invalid ID" });
    }
  }
}

export default new UserController();
