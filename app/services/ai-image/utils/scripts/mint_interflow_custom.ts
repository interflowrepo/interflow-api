export const mint_interflow_custom = ` import InterflowCustom from 0xfe514356a985ec2a \n import NonFungibleToken from 0x631e88ae7f1d7c20 \n import MetadataViews from 0x631e88ae7f1d7c20 \n transaction( recipient: Address, id: UInt64, name: String, description: String, originalNftUuid: UInt64, originalNftImageLink: String, originalNftCollectionName: String) { \n let minter: &InterflowCustom.NFTMinter \n let recipientCollectionRef: &{NonFungibleToken.CollectionPublic} \n let mintingIDBefore: UInt64 \n prepare(signer: AuthAccount) { \n self.mintingIDBefore = InterflowCustom.totalSupply \n self.minter = signer.borrow<&InterflowCustom.NFTMinter>(from: InterflowCustom.MinterStoragePath) ?? panic("Account does not store an object at the specified path") \n self.recipientCollectionRef = getAccount(recipient).getCapability(InterflowCustom.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() ?? panic("Could not get receiver reference to the NFT Collection") \n } \n execute {\n var count = 0 \n var royalties: [MetadataViews.Royalty] = [] \n self.minter.mintNFT( recipient: self.recipientCollectionRef, id: id, name: name, description: description, originalNftUuid: originalNftUuid, originalNftImageLink: originalNftImageLink, originalNftCollectionName: originalNftCollectionName, originalNftType: nil, originalNftContractAddress: nil, royalties: royalties) \n }}`