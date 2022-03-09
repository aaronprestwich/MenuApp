// Menu app for creating a character for any RPG.
class Character{
    constructor(name, race, career, level){
        this.name = name;
        this.race = race;
        this.career = career;
        this.level = level;
    }
    about(){
        return `${this.name} is a level ${this.level} ${this.race} ${this.career}.`;
    }    
}
// Characters are kept track through players.
class Player{
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
        this.characters = [];
    }
    createCharacter(character){
        if (character instanceof Character) {
            this.characters.push(character);
        }
        else{
            throw new Error(`${character} is not a valid character. Please type a character name.`);
        }
    }
    about(){
        return `${this.firstName} created ${this.characters.length} characters. ${this.characters}`;
    }
}
class Menu{
    constructor() {
        this.players = [];
        this.characters = [];
        this.selectedPlayer = null;    
    }
    // Main menu displays selections to user listed from displayMenu()
    start(){
            let selection = this.displayMenu();
            while(selection != "e"){
                switch (selection) {
                    case "n":
                        this.newPlayer();
                        break;
                    case "l":
                        this.listPlayers();
                        break;
                    case "s":
                        this.selectPlayer();
                        break;
                    case "d":
                        this.deletePlayer();
                        break;                   
                    default:
                        selection = "e";
                        break;
                }
                selection = this.displayMenu();
            }
            // When e is selected, check to see if user really wants to quit.                     
            let answer = prompt("Are you finished making your character? Answer with y/n");
            if (answer.toLowerCase() == "n") {
                let menu = new Menu();
                return menu.start();
            }            
            else{
                return alert("Enjoy your new character.");
            }        
    }
    // Display menu for players
    displayMenu(){
        return prompt(`Choose an Option listed below.
            n) New player.
            l) Show list of players.
            s) Select an existing player.
            d) Delete a player.
            e) Exit.
            `
        );
    }
    // Display menu for character creation.
    showPlayerOptions(about){
        return prompt(`Choose an Option listed below.
            c) Create a new character.
            l) Show list of characters.            
            d) Delete a character.
            e) Exit.
            -------------
            ${about}`
        );
    }
    // Adding a new player.
    newPlayer(){
        let firstName = prompt(`Enter your first name.`);
        let lastName = prompt(`Enter your last name.`);
        this.players.push(new Player(firstName, lastName));        
    }
    // Selection to list players. 
    listPlayers(message){                
        let showPlayer = "";
        let playerNum = 0;
        for (let i = 0; i < this.players.length; i++) {
            playerNum = i + 1;
            showPlayer += `
            ${i}) ${this.players[i].firstName} ${this.players[i].lastName}`;                   
        }
        // If there is no message in listPlayers(message) then don't print message.                           
        if (message == undefined) {
            // If there is one player then print player rather than players.
            if (playerNum == 1){
                alert(`You have ${playerNum} player to choose from.
                ${showPlayer}`);
            }
            else{
                alert(`You have ${playerNum} players to choose from.
                ${showPlayer}`);
            }            
        }
        else{
            // If there is one player then print player rather than players.
            if (playerNum == 1) {
                var newMessage = `${message} You have ${playerNum} player to choose from.
                ${showPlayer}`;
            }
            else{
                var newMessage = `${message} You have ${playerNum} players to choose from.
                ${showPlayer}`;                
            }
            // newMessage will contain the message provided in listPlayers(message) and list of players.
            return prompt(newMessage);
        }        
    }
    deletePlayer(){
        // If there are no players to delete then tell the user.
        if (this.players.length == 0) {
            alert("There are no players to delete.");            
        }
        else{
            // This will ask who to delete and show the list of players.
            let number = this.listPlayers(`Enter the number of the player you would like to delete.`);                      
            if (-1 < number && number <= this.players.length) {
                alert(`${this.players[number].firstName} ${this.players[number].lastName} is now deleted.`);
                this.players.splice(number,1);
                }
            else{
                // If the user selects a value other than listed then go back to menu.
                alert(`Choose a player represented by a number.`);
            }   
        }             
    }
    // Method that starts the character creation for the player that was selected.
    selectPlayer(){
        if(this.players.length == 0){
            alert("There are no players to select. Please add a player before selecting one.");
        }
        else{
            // Shows message + the list of players. Number equals what the user inputs, which is the number the player is represented by.
            let number = this.listPlayers(`Select a player represented by a number, to view profile.`);
            // If the number is greater than -1 and is less than equal to the amount of players, then continue with the selected player.
            if (-1 < number && number <= this.players.length) {
                this.selectedPlayer = this.players[number];            
                let about = `${this.selectedPlayer.firstName} ${this.selectedPlayer.lastName} has ${this.selectedPlayer.characters.length} characters.`;
                // Shows options from line 83            
                let selection = this.showPlayerOptions(about);
                while(selection != "e"){
                    switch (selection) {
                        case "c":
                            this.createCharacter();
                            break;
                        case "l":
                            this.listCharacters();
                            break;                    
                        case "d":
                            this.deleteCharacter();
                            break;                   
                        default:
                            selection = "e";
                            break;
                    }
                    // Singular or plural statement like line 122 from listPlayers()
                    if (this.selectedPlayer.characters.length == 1) {
                        let updatedAbout = `${this.selectedPlayer.firstName} ${this.selectedPlayer.lastName} has ${this.selectedPlayer.characters.length} character.`;
                        selection = this.showPlayerOptions(updatedAbout);    
                    }
                    else{
                        let updatedAbout = `${this.selectedPlayer.firstName} ${this.selectedPlayer.lastName} has ${this.selectedPlayer.characters.length} characters.`;
                        selection = this.showPlayerOptions(updatedAbout);
                    }
                }
                // If e is selected then it will go back to main menu.
                alert("Going back to player menu.");
            }
            // Loops back until a player is selected.
            else{
                alert(`Choose a player represented by a number.`);
                this.selectPlayer();
            }
        }        
    }
    // Create a character selection that will add a Character object to the characters array.
    createCharacter(){
        let name = prompt('Enter the name of your new character.');
        let race = prompt(`What race is ${name}?`);
        let career = prompt(`What is the class of ${name}?`)
        let level = prompt(`What level is ${name}?`);
        this.selectedPlayer.characters.push(new Character(name, race, career, level));
    }

    listCharacters(message){
        let showCharacter = "";
        let characterNum = 0;        
        for (let i = 0; i < this.selectedPlayer.characters.length; i++) {
            characterNum = i + 1;
            showCharacter += `
            ${i}) ${this.selectedPlayer.characters[i].name} the lvl. ${this.selectedPlayer.characters[i].level} ${this.selectedPlayer.characters[i].race} ${this.selectedPlayer.characters[i].career}.`;                   
        }     
        // If no message is defined then the below is used.                      
        if (message == undefined) {
            // Singular or plural
            if (characterNum == 1){
                alert(`You have ${characterNum} character.
                ${showCharacter}`);
            }
            else{
                alert(`You have ${characterNum} characters.
                ${showCharacter}`);
            }            
        }
        else{
            // Singular or plural
            if (characterNum == 1) {
                var newMessage = `${message} You have ${characterNum} character.
                ${showCharacter}`;
            }
            else{
                var newMessage = `${message} You have ${characterNum} characters.
                ${showCharacter}`;                
            }
            // newMessage will show message, the number of characters, and list them.
            return prompt(newMessage);
        }                
    }
    deleteCharacter(){
        // If there are no characters to delete then tell the user.
        if(this.selectedPlayer.characters.length == 0){
            alert("There are no characters to delete.");
        }
        else{
            // This will ask which character to delete and show the list of characters.
            let number = this.listCharacters(`Enter the number of the character you would like to delete.`);                      
            if (-1 < number && number <= this.selectedPlayer.characters.length) {
                alert(`${this.selectedPlayer.characters[number].name} is now deleted.`);
                this.selectedPlayer.characters.splice(number,1);
                }
            else{
                // If the user selects a value other than listed then go back to menu.
                alert(`Choose a character represented by a number.`);                
            }  
        }        
    }    
}
       
let menu = new Menu();
menu.start();