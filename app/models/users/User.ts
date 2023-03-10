import { InterflowCustomNft } from "@models/interflow-custom-nft/InterflowCustomNft";
import { Post } from "@models/posts/Post";
import {
  DataType,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from "sequelize-typescript";

@Table
export class User extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  authId!: string;

  @Column(DataType.STRING)
  expoToken!: string;

  @Column(DataType.STRING)
  nickname!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.INTEGER)
  interflowTokens!: number;

  @Column(DataType.STRING)
  interflowAddress!: string;

  @Column(DataType.BOOLEAN)
  interflowCollectionInitialized!: boolean;

  @Column(DataType.STRING)
  interflowCollectionInitializedJobId!: string;

  @Column(DataType.STRING)
  bloctoAddress!: string;

  @Column(DataType.STRING)
  dapperAddress!: string;

  @Column(DataType.INTEGER)
  nftLength!: number;

  @Column(DataType.STRING)
  bgImage!: string;

  @Column(DataType.STRING)
  pfpImage!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  followers!: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  following!: string[];

  @Column(DataType.ARRAY(DataType.STRING))
  nftCollections!: string[];

  @HasMany(() => Post)
  userPosts!: Post[];

  @HasMany(() => InterflowCustomNft)
  customNfts!: InterflowCustomNft[];
}
