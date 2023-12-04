$(document).ready(function () {
    const searchBar = $('#searchBar');
    const charactersList = $('#charactersList');
    let characters = []; 

    const fetchCharacters = () => {
        $.ajax({
            type: "GET",
            url: 'https://hp-api.onrender.com/api/characters',
            dataType: 'json',
            success: function (data) {
                characters = data;
                displayCharacters(characters);
            },
            error: function (xhr, status, error) {
                alert(
                  "Result: " +
                    status +
                    " " +
                    error +
                    " " +
                    xhr.status +
                    " " +
                    xhr.statusText
                );
              },
            });
          };

    const displayCharacters = (characters) => {
        charactersList.empty();
        let limitedCharacters = characters.slice(0, 26);
        $.each(limitedCharacters, function (index, character) {
            let characterItem = createCharacterItem(character);
            charactersList.append(characterItem);
        });
    };

    const createCharacterItem = (character) => {
        let characterItem = $('<li>').addClass('character');
        $('<h2>').text(character.name).appendTo(characterItem);
        $('<p>').text('Species: ' + character.species + ',  Gender: ' + character.gender).appendTo(characterItem);
        $('<img>').attr('src', character.image).appendTo(characterItem);
        return characterItem;
    };

    const filterCharacters = (searchTerm) => {
        const filteredCharacters = $.grep(characters, function (character) {
            return character.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        displayCharacters(filteredCharacters);
    };

    searchBar.on('input', function () {
        const searchTerm = $(this).val().trim();
        filterCharacters(searchTerm);
    });

    // Initial fetch and display characters
    fetchCharacters();
});
