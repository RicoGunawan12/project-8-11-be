import { MetadataModel } from "../association/association.js";
import { getAllMetadataService, getMetadataService } from "../services/metadata.service.js"

export const getMetadata = async (req,res) =>{
  const { slug } = req.params

  try {
    const metadata = await getMetadataService(slug)

    return res.status(200).json(metadata);
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

export const getAllMetadata = async (req,res) =>{
  const { slug } = req.params

  try {
    const metadatas = await getAllMetadataService(slug)

    return res.status(200).json({metadatas: metadatas});
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

export const insertMetadata = async (req,res) => {
  try {
    const images = req.files?.["openGraphImage"] || [];
    const { slug, title, description, openGraph, keywords } = req.body;
    console.log(slug, title, description, openGraph, keywords )
    console.log("hellow")
    
    MetadataModel.create({
      slug: slug,
      title: title,
      description: description,
      openGraph: openGraph,
      keywords: keywords
    })
    return res.status(200)
  } catch (error) {
    return res.status(404).send(error.message)
  }
}