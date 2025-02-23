import { MetadataModel } from "../association/association.js";

export const getAllMetadataService = async () => {

  const metadatas = await MetadataModel.findAll();

  return metadatas;
};

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

export const insertMetadataService = async (newData) => {
  console.log(newData);
  const metadata = await MetadataModel.create({
    slug: newData.slug,
    title: newData.title,
    description: newData.description,
    metadataBase: 'https://tyesoindonesia.id/',
    alternates: '{"canonical": "https://tyesoindonesia.id/"}',
    icons: JSON.stringify({}),
    openGraph: '{"title": "TYESO", "description": "TYESO", "url": "https://tyesoindonesia.id/", "siteName": "TYESO", "images": [{"url": "https://tyesoindonesia.id/_next/image?url=%2Flogo.png&w=96&q=75", "width": 800, "height": 600}, {"url": "https://tyesoindonesia.id/_next/image?url=%2Flogo.png&w=96&q=75", "width": 1800, "height": 1600, "alt": "img"}], "locale": "en_US", "type": "website"}',
    keywords: newData.keywords
  });

  return metadata;
}

export const updateMetadataService = async (slug, newData) => {
  const metadata = await MetadataModel.findOne({
    where: { slug: slug }
  });

  if (metadata === null || metadata === undefined) {
    throw new Error("Internal server error, metadata not found");
  }

  const result = await MetadataModel.update({
    title: newData.title,
    description: newData.description,
    keywords: newData.keywords
  }, { where: { metadataId: id } });

  return result;
}
