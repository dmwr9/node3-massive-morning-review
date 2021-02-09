const masterCharacterList = []
id = 0

module.exports = {
    getAllCharacters: (req, res) => {
        const db = req.app.get('db');
        db.get_all_characters()
        .then( characters => res.status(200).send(characters))
        .catch( err => res.status(500).send(err))
    },
    getCharacter: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db');
        db.get_character(+id)
        .then( character => res.status(200).send(character) )
        .catch( err => res.status(500).send(err) )
    },
    addCharacter: (req, res) => {
        // const newCharacter = {...req.body}
        // {
        //     name: "Spongebob",
        //     image: "image.url.png"
        // }
        const {name, image} = req.body
        const db = req.app.get('db');
        db.add_character([name, image])
        .then(characters => res.status(200).send(characters))
        .catch( err => res.status(500).send(err))
    },
    editCharacter: (req, res) => {
        const {id} = req.params
        const {name, image} = req.body
        const index = masterCharacterList.findIndex(character => character.id === +id)
        const currentCharacter = {...masterCharacterList[index]}
        masterCharacterList[index] = {
            id: +id,
            name: name || currentCharacter.name,
            image: image || currentCharacter.image
        }
        res.status(200).send(masterCharacterList)
    },
    deleteCharacter: (req, res) => {
        const {id} = req.params
        const index = masterCharacterList.findIndex(character => character.id === +id)
        masterCharacterList.splice(index, 1)
        res.status(200).send(masterCharacterList)
    }
}
