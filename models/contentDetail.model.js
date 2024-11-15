import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ContentDetail = sequelize.define('content_detail', {
    contentDetailId: {
      field: "content_detail_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    contentId: {
      field: "ref_content_id",
      type: DataTypes.UUID,
      primaryKey: false
    },
    contentGroup: {
      field: "content_group",
      type: DataTypes.STRING,
      allowNull: false
    },
    seqNo: {
      field: "seq_no",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pictureUrl: {
      field: "picture_url",
      type: DataTypes.STRING,
      allowNull: true
    },
    hierarchy: {
      field: "hierarchy",
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contentType: {
      field: "content_type",
      type: DataTypes.STRING,
      allowNull: false
    },
    isClickable: {
      field: "is_clickable",
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    text:{
      field: "text",
      type: DataTypes.STRING,
      allowNull: true
    },
    color:{
      field: "text",
      type: DataTypes.STRING,
      length: 7,
      allowNull: true
    },
    refFrom:{
      field: "ref_from",
      type: DataTypes.STRING,
      allowNull: true
    },
    refId:{
      field: "ref_id",
      type: DataTypes.UUID,
      allowNull: true
    },
    destPageId: {
      field: "ref_dest_page_id",
      type: DataTypes.UUID,
      allowNull: true,
      length: 100
    }
},{
  timestamps: false
})

export default ContentDetail;