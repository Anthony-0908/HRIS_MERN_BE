import { AppDataSource } from "../data-source";
import { Position } from "../entity/Postion";
import {Request , Response} from "express"




export const getAllPositions = async(req:Request, res:Response)  => { 
    const positionRepository = AppDataSource.getRepository(Position) 

    try {
        const positions = await positionRepository.find()
        res.status(200).json(positions)
    } catch (error) {
        res.status(500).json({message:'Error retrieving position', error})
    }
}



export const getOnePositions = async(req:Request, res:Response): Promise<void>  => { 
    const {id} = req.params
    const positionRepository = AppDataSource.getRepository(Position) 

    try {
        const position = await positionRepository.findOneBy({id:parseInt(id)})
        if(!position) { 
            res.status(404).json({message:"Position is not found"})
        }
        else{
            res.status(200).json(position)
            return
        }
    } catch (error) {
        res.status(500).json({message:'Error retrieving position', error})
    }
}






export const CreatePosition = async(req:Request, res:Response)  => { 
    const positionRepository = AppDataSource.getRepository(Position) 
    const position = new Position() 
    position.PositionName = req.body.PositionName;
    position.Description = req.body.Description

    try {
        const savedPosition = await positionRepository.save(position)
        res.status(201).json(savedPosition)
    } catch (error) {
        console.error("Error creating position:", error);
        let errorMessage = 'Error creating position';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({ message: errorMessage, error });
}


}



export const deletePosition = async(req:Request, res:Response): Promise<void>  => { 
    const { id } = req.params
    const positionRepository = AppDataSource.getRepository(Position) 

    try {

        const positionDelete = await positionRepository.findOneBy({id:parseInt(id)})

        if(!positionDelete)
        {
            res.status(404).json({message:'Position is not found '})
        }

        res.status(200).json({message:'Position is successfully killed'})
    } catch (error) {
        res.status(500).json({message:'Error retrieving position', error})
    }
}



export const updatePosition = async(req:Request, res:Response):Promise<void> => { 
    const {id} = req.params
    const positionRepository = AppDataSource.getRepository(Position) 

    try {
        const positionUpdate = await positionRepository.findOneBy({id:parseInt(id)})

        if(!positionUpdate) { 
            res.status(404).json({message:'Position is not found'})
            return 

        }

        if(req.body.PositionName) 
        { 
            positionUpdate.PositionName = req.body.PositionName;
        }

        if(req.body.Description)
        { 
            positionUpdate.Description = req.body.Description 
        }


        const updatedPosition = await positionRepository.save(positionUpdate)
        res.status(200).json(updatedPosition)
    } catch (error) {
        console.error("Error updating position:", error);
        let errorMessage = 'Error updating position';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({message:'Error retrieving position', error})
    }
}



 


