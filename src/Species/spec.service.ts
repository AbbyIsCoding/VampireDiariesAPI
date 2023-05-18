import { Injectable, NotFoundException } from '@nestjs/common';

import { species } from './spec.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';

@Injectable()
export class speciesService{
    constructor (@InjectModel('species') private readonly speciesModel: Model<species>) {}

    //Post 
    async addSpecies(name: string, status: string, description: string, picture: string) {
        const newSpecies = new this.speciesModel({ // creating the model of the new character 
            name: name,
            status: status,
            description: description,
            picture: picture,
             
        }); 
        const result = await newSpecies.save(); // waiting for the new species to be created, and then using it 
        return result.id as string; // returning the new id of what you made and making it a string 
    }

    //Patch (update)
    async updateSpeciesById(speciesId: string, name: string, status: string, description: string, picture: string){ 
       const updatedSpecies = await this.findSpecies(speciesId);
       if (name){ // saying if this thing exists 
        updatedSpecies.name = name;
    }
        if(status){
            updatedSpecies.status = status;
        }

        if(description){
            updatedSpecies.description = description;
        }

        if(picture){
            updatedSpecies.picture = picture; 
    }
        updatedSpecies.save();
    } 

    
    //Get 
    //(get all )
    async getSpecies() {
        const allSpecies= await this.speciesModel.find().exec(); 
        return allSpecies.map((allspec) => ({
            id: allspec.id, //is this where I use the ID for the first time ??? 
            name: allspec.name, 
            status: allspec.status,
            description: allspec.description,
            picture: allspec.picture   
           
        }));
    }

    //getting one by the id 
    async getSpeciesById(speciesId: string) {
        const spec = await (await this.findSpecies(speciesId));
        return {name: spec.name, status: spec.status, description: spec.description, picture: spec.picture};
    }

    //(find one)
    async findSpecies(speciesId: string): Promise<species>{
        let species;
        try {
            species = await this.speciesModel.findById(speciesId)

        } catch (error) {
            throw new NotFoundException('product does not exist');

        }
        if (!species) {
            throw new NotFoundException('product does not exist');
        }
        return species;
    }

    //Delete (find then delete)
    async deleteSpeciesById(speciesId: string) {
        const result = await this.speciesModel.deleteOne({ _id: speciesId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('product does not exist');
        }

    }

}

