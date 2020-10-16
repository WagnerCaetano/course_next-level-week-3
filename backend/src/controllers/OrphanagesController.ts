import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import { Request, Response } from "express";
import orphanagesView from "../views/orphanages_view";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = (await orphanagesRepository.find({
      relations: ["images"],
    })) as Orphanage[];

    return response.status(200).json(orphanagesView.renderMany(orphanage));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = (await orphanagesRepository
      .findOneOrFail(id, { relations: ["images"] })
      .catch(() => {
        return response.status(404).json({ message: "Orphanage Not Found !" });
      })) as Orphanage;

    return response.status(200).json(orphanagesView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;
    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename.replace(/ /g, "%20") };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ).required(),
    });

    await schema.validate(data, { abortEarly: false });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};
