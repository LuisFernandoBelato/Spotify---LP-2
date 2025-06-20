import Musica from "../models/Musica/Musica.js";

class MusicaController
{
  static async createMusica (req, res)
  {
    const { 
      nome, 
      autorId, 
      genero,
      artist
    } = req.body;

    const filePath = req.files?.audioFile?.[0]?.filename ? '/backend/uploads/' + req.files?.audioFile[0].filename : null;
    const thumbnailPath = req.files?.thumbnailFile?.[0]?.filename ? '/backend/uploads/' + req.files?.thumbnailFile[0].filename : null;

    try
    {
        const novaMusica = new Musica(nome, autorId, filePath, thumbnailPath, genero, artist); 
        await novaMusica.save();
        return res.status(201).json(novaMusica);
    }
    catch (error)
    {
        console.error("Erro ao Criar a Musica: ", error);
        return res.status(500).json({message: "Erro interno ao Criar a Musica."});
    }
  }

  static async getAllMusicas (req, res)
  {
    try
    {
        const musicas = await Musica.findAll();
        return res.status(200).json(musicas);
    }
    catch (error)
    {
        console.error("Erro ao Carregar as Musicas: ", error);
        return res.status(500).json({message: "Erro Interno ao Carregar as Musicas."});
    }
  }

  static async getAllMusicsByUser (req, res)
  {
    const { id } = req.params;
    let musicas;
    try
    {
        musicas = await Musica.findAllByUserId(id);
        console.log("musicas = ", musicas);
        console.log("id = ", id)
        if (musicas)
          return res.status(200).json(musicas);
        else
          return res.status(400).json({message: "Música não encontrada."});
    }
    catch (error)
    {
        console.error("Erro ao Carregar a Música: ", error);
        return res.status(500).json({message: "Erro Interno ao Carregar a Música. ", musicas});
    }
  }

  static async getMusicaById (req, res)
  {
    const { id } = req.params;
    let musica;
    try
    {
        musica = await Musica.findById(id);
        if (musica)
        return res.status(200).json(musica);
        else
        return res.status(400).json({message: "Música não encontrada."});
    }
    catch (error)
    {
        console.error("Erro ao Carregar a Música: ", error);
        return res.status(500).json({message: "Erro Interno ao Carregar a Música. ", musica});
    }
  }
  
  static async updateMusica (req, res)
  {
    const { id } = req.params;

    const {
      nome, 
      autorId, 
      genero,
      artist
    } = req.body;

    const filePath = req.files?.audioFile?.[0]?.filename ? '/backend/uploads/' + req.files?.audioFile[0].filename : null;
    const thumbnailPath = req.files?.thumbnailFile?.[0]?.filename ? '/backend/uploads/' + req.files?.thumbnailFile[0].filename : null;    

    let newMusica = {
      nome, 
      autorId, 
      genero,
      artist,
      filePath,
      thumbnailPath
    };
    
    if (!thumbnailPath || !filePath)
    {
      const musica = await Musica.findById(id);
      if (musica)
      {
         if (!thumbnailPath)
            newMusica.thumbnailPath = musica.thumbnailPath;
         if (!filePath)
            newMusica.filePath = musica.filePath;
      }
    }
    
    try
    {
        if (await Musica.update(id, newMusica))
            return res.status(201).json({updateMusica: newMusica, message: "Música atualizada com Sucesso !"});
        else
            return res.status(400).json({message: "Música não está cadastrada."});
    }
    catch (error)
    {
        console.error("Erro ao atualizar a Música: ", error);
        return res.status(500).json({message: "Erro Interno ao atualizar a Música."});
    } 
  }

  static async deleteMusica (req, res)
  {
    const { id } = req.params;

    try
    {
      if (await Musica.delete(id))
        return res.status(200).json({message: "Música deletada com Sucesso !"});
      else
        return res.status(500).json({message: "Erro ao atualizar a Música."});
    }
    catch (error)
    {
      console.error("Erro ao deletar a Música: ", error);
      return res.status(500).json({message: "Erro Interno ao deletar a Música."});
    } 
  }
}

export default MusicaController;