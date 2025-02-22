import { MetadataModel } from "../association/association.js";

export const getMetadataService = async (slug) => {

  var metadata = await MetadataModel.findOne({
    where: { slug: slug },
  });

  if (!metadata) {
    metadata = await MetadataModel.findOne({
      where: { slug: 'default' },
    });
  }

  return {
    ...metadata.dataValues,
    alternates: metadata.alternates,
    icons: metadata.icons,
    openGraph: metadata.openGraph,
    keywords: metadata.keywords, 
  };
};
