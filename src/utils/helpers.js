import GenreJsonList from "../constants/genres.json";

export const getGenres = (genreIds) => {
    if (genreIds.length <= 0) {
        return;
    }
    const genreList = genreIds.map(genre => GenreJsonList.find(item => item.id === genre).name);
    let commaSeparatedGenre = genreList.length > 0 ? genreList.join("/") : null;
    return commaSeparatedGenre;
}