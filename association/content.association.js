import ContentDetail from "../models/contentDetail.model.js";
import ContentHeader from "../models/contentHeader.model.js";
import Page from "../models/page.model.js";

ContentHeader.hasMany(ContentDetail, { foreignKey: 'ref_content_id' });
ContentDetail.belongsTo(ContentHeader, { foreignKey: 'ref_content_id' });

Page.hasMany(ContentDetail, { foreignKey: 'ref_dest_page_id' });
ContentDetail.belongsTo(Page, { foreignKey: 'ref_dest_page_id' });

Page.hasMany(ContentHeader, { foreignKey: 'ref_page_id' });
ContentHeader.belongsTo(Page, { foreignKey: 'ref_page_id' });

export { ContentDetail, ContentHeader, Page }