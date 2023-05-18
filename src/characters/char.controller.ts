import { Controller, Post, Patch, Delete, Body, Get, Param } from '@nestjs/common';
import { characterService } from './char.service';

@Controller('characters')
export class characterController {
    constructor(private readonly charsService: characterService) { }
    
    @Get()
    async getAllChars() {
        const chars = await this.charsService.getCharacters(); //what is this.charsService? 
        return chars;
    }

    @Post()
    async addProduct(
        @Body('name') characterName: string, 
        @Body('title') characterTitle: Array<string>, 
        @Body('species') characterSpecies: Array<string>,
        @Body('gender') characterGender: string, 
        @Body('actor') characterActor: string, 
        @Body('picture') characterPicture: string,
        ) {

        const generatedId = await this.charsService.addCharacter(characterName, characterTitle, characterSpecies,characterGender, characterActor, characterPicture);
        return { id: generatedId };
    }
    

    @Get(':id')
    async getCharById(@Param('id') charId: string,) {
        const char  = await this.charsService.getCharacterById(charId);
        return char;
    }

    @Get('gender/Male')
    async getAllGuys() {
        const guys = await this.charsService.gettAllGuys(); 
        return guys;
    }

    @Get('gender/Female')
    async getAllGals() {
        const girls = await this.charsService.getAllGals(); 
        return girls;
    }

    @Patch(':id')
    async updateCharById(
        @Param('id') charId: string,
        @Body('name') characterName: string, 
        @Body('title') characterTitle: Array<string>, 
        @Body('species') characterSpecies: Array<string>,
        @Body('gender') characterGender: string, 
        @Body('actor') characterActor: string, 
        @Body('picture') characterPicture: string,
    ) {
        
        await this.charsService.updateCharacterById(charId, characterName, characterTitle, characterSpecies, characterGender, characterActor, characterPicture);
        return null;
    }

    @Delete(':id')
    async deleteCharById(@Param('id') charId: string,) {
        await this.charsService.deleteCharacterById(charId);
        return null;
    }
   
}
