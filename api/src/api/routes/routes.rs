use super::*;

use rocket::response::NamedFile;
use rocket_contrib::json::JsonValue;

#[get("/")]
pub fn index() -> std::io::Result<NamedFile> {
    NamedFile::open("./index.html")
}

#[get("/<filename>")]
pub fn file_serve(filename: String) -> std::io::Result<NamedFile> {
    NamedFile::open(filename)
}

#[post("/game/new")]
pub fn new_game(conn: GamesDbConn) -> Result<JsonValue, CardAPIError> {
    let game = Game::new();
    game.save(&conn)?;
    Ok(game.into())
}

#[get("/game/<id>")]
pub fn get_game(conn: GamesDbConn, id: String) -> Result<JsonValue, CardAPIError> {
    let game = Game::load(&conn, id)?;
    Ok(game.into())
}

#[get("/game/<id>/<name>", rank = 2)]
pub fn get_pile(conn: GamesDbConn, id: String, name: String) -> Result<JsonValue, CardAPIError> {
    let mut game = Game::load(&conn, id)?;
    let pile = if game.has_pile(&name) {
        game.get_pile(&name)
    } else {
        game.new_pile(name.clone());
        game.save(&conn)?;
        game.get_pile(&name)
    };

    Ok(json!({ name: pile }))
}

use rocket_contrib::json::Json;

#[put("/game/<id>/<name>", data = "<drawdata>")]
pub fn draw_into_pile(
    conn: GamesDbConn,
    id: String,
    name: String,
    drawdata: Json<DrawData>,
) -> Result<JsonValue, CardAPIError> {
    let mut game = Game::load(&conn, id)?;
    game.draw(&drawdata.source, &name, &drawdata.selection)?;
    game.save(&conn);
    Ok(game.into())
}
