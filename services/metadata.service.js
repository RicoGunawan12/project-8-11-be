import { MetadataModel } from "../association/association.js";

export const getMetadataService = async (slug) => {

  const metadata = await MetadataModel.findOne({
    where: { slug: slug },
  });

  if (!metadata) {
    throw new Error("Metadata not found for slug:", slug);
  }

  return {
    ...metadata.dataValues,
    alternates: JSON.parse(metadata.alternates),
    icons: JSON.parse(metadata.icons),
    openGraph: JSON.parse(metadata.openGraph),
    keywords: metadata.keywords, 
  };
};

export const getAllMetadataService = async () => {
  const metadataList = await MetadataModel.findAll();
  
  return metadataList.map(metadata => ({
    ...metadata.dataValues,
    alternates: metadata.alternates,
    icons: metadata.icons,
    openGraph: metadata.openGraph,
    keywords: metadata.keywords,
  }));
};
