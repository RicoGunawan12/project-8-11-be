import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Post = sequelize.define("posts", {
    postId: {
      field: "post_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    postImage: {
      field: "post_image",
      type: DataTypes.TEXT,
      primaryKey: false,
    },
    postTitle: {
      field: "post_title",
      type: DataTypes.STRING,
      primaryKey: false,
      length: 100
    },
    postContent: {
      field: "post_content",
      type: DataTypes.TEXT,
      primaryKey: false
    },
    createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: true
    }
})

export default Post;