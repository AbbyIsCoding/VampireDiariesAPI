import { Injectable, NotFoundException } from '@nestjs/common';

import { character } from './char.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';
import { exec } from 'child_process';
import e from 'express';

@Injectable()
export class characterService{
    constructor (@InjectModel('character') private readonly characterModel: Model<character>) {}

    //Post 
    async addCharacter(name: string, title: Array<string>, spec: Array<string>, gen: string, act: string, pic: string) {
        const newCharacter = new this.characterModel({ // creating the model of the new character 
            name: name, 
            title: title, 
            species: spec,
            gender: gen, 
            actor: act, 
            picture: pic,  
        }); 
        const result = await newCharacter.save(); // waiting for the new character to be created, and then using it 
        // console.log(result); 
        return result.id as string; // returning the new id of what you made and making it a string 
    }

    async gettAllGuys(){
        const chars = await this.characterModel.find().exec();
        const guyChar = chars.filter((e)=> e.gender === "Male");
        return guyChar.map(g => ({ id: g.id,
            name: g.name,
            title: g.title,
            species: g.species,
            gender: g.gender,
            actor: g.actor, 
            picture: g.picture, 
        }));
    }

    async getAllGals(){
        const chars = await this.characterModel.find().exec();
        const galChar = chars.filter((e)=> e.gender === "Female");
        return galChar.map(g => ({ id: g.id,
            name: g.name,
            title: g.title,
            species: g.species,
            gender: g.gender,
            actor: g.actor, 
            picture: g.picture,   
        }));

    }

    

    //Patch (update)
    async updateCharacterById(charId: string, name: string, title: Array<string>, species: Array<string>, gender: string, actor: string, picutre: string){ 
        const updatedCharacter = await this.findCharacter(charId);

        
        if (name){ // saying if this thing exists 
            updatedCharacter.name = name;
        }
        if (title) { //weird syntax for writing arrays 
            
            title.forEach(e => {
                if (e && updatedCharacter.title.indexOf(e) == -1) {
                    updatedCharacter.title.push(e);
                }
            });
            // console.log(updatedCharacter.title);
        }

        if (species) {
            species.forEach(e => {
                if (e && updatedCharacter.species.indexOf(e) == -1){
                    updatedCharacter.species.push(e);
                }
            })
        }

        if (gender){
            updatedCharacter.gender = gender; 
        }
        
        if (actor){
            updatedCharacter.actor = actor; 
        }

        if(picutre){
            updatedCharacter.picture = picutre; 
        }
        
        updatedCharacter.save();
    } 

    
    //Get 
    //(get all )
    async getCharacters() {
        const allCharacters = await this.characterModel.find().exec(); 
        return allCharacters.map((allchar) => ({
            id: allchar.id, //is this where I use the ID for the first time ??? 
            name: allchar.name, 
            title: allchar.title,
            species: allchar.species, 
            gender: allchar.gender, 
            actor: allchar.actor, 
            picture: allchar.picture   
        }));
    }

    //getting one by the id 
    async getCharacterById(charId: string) {
        const char = await (await this.findCharacter(charId));
        return { name: char.name, title:char.title, species: char.species, gender: char.gender, actor: char.actor, picture: char.picture };
    }

    //(find one)
    async findCharacter(charId: string): Promise<character>{
        let character;
        try {
            character = await this.characterModel.findById(charId)

        } catch (error) {
            throw new NotFoundException('product does not exist');

        }
        if (!character) {
            throw new NotFoundException('product does not exist');
        }
        return character;
    }

    //Delete (find then delete)
    async deleteCharacterById(charId: string) {
        const result = await this.characterModel.deleteOne({ _id: charId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('product does not exist');
        }

    }

}

