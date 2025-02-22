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
    alternates: JSON.parse(metadata.alternates),
    icons: JSON.parse(metadata.icons),
    openGraph: JSON.parse(metadata.openGraph),
    keywords: metadata.keywords, 
  };
};
