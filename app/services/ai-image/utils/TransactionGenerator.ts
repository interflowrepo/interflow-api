import { init_interflow_custom } from "./scripts/init_interflow_custom";
import { mint_interflow_custom } from "./scripts/mint_interflow_custom";

class TransactionGenerator {
    async generateMintCustomNftTransaction(
        nftCollectionName: string,
        nftImageLink: string,
        nftUuid: string,
        userInterflowAddress: string,
    ) {
        //recipient: Address, name: String, description: String, originalNftUuid: UInt64, originalNftImageLink: String, originalNftCollectionName: String
        return {
            code: mint_interflow_custom,
            arguments: [
                {
                    type: "Address",
                    value: userInterflowAddress,
                },
                {
                    type: "String",
                    value: "Interflow Custom NFT",
                },
                {
                    type: "String",
                    value: "First NFT generated by an AI using another NFT as a reference in the Flow blockchain",
                },
                {
                    type: "UInt64",
                    value: nftUuid,
                },
                {
                    type: "String",
                    value: nftImageLink,
                },
                {
                    type: "String",
                    value: nftCollectionName,
                }
            ],
        }
    }

    async generateInitCustomCollectionTransaction(){
        return {
            code: init_interflow_custom,
            arguments: [],
        }
    }

}

export default new TransactionGenerator();