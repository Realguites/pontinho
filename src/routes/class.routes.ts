import { Router } from 'express';
import { getRepository, getCustomRepository, getConnection } from 'typeorm';
import Class from '../entity/Class';
import ClassRepository from '../repositories/ClassRepository';
import { validate } from "class-validator"

const classRouter = Router(); 

classRouter.post('/', async (request, response) => {
  try {
    const repo = getRepository(Class);
    const { name, duration } = request.body;
    const classroom = repo.create({
      name,
      duration
    })
    const errors = await validate(classroom)

    if(errors.length == 0){
      const res = await repo.save(classroom)
      await getConnection().queryResultCache?.remove(['listClassRoom'])
      return response.status(201).json(res)
    }
    return response.status(400).json(errors.map(v => v.constraints))
   
  } catch (err) {
    console.log('err.message :>> ', err.message);
  }
});

classRouter.get('/', async (request, response) => {
  response.json(await getRepository(Class).find({ cache: { id: 'listClassRoom', milliseconds: 1000} }));;
});

classRouter.get('/:name', async (request, response) => {
  const repository = getCustomRepository(ClassRepository);
  const res = await repository.findByName(request.params.name);
  response.json(res);
});

export default classRouter;
