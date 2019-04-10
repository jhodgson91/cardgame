use super::api::*;
use super::cards::*;
use super::models;

use diesel::prelude::*;

use serde::{Deserialize, Serialize};

use std::cell::RefCell;
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug)]
pub struct Game {
    id: String,
    piles: HashMap<String, RefCell<Cards>>,
}

impl Game {
    pub fn new() -> Game {
        let mut piles = HashMap::new();
        piles.insert(
            String::from("deck"),
            RefCell::new(Cards::from(CardSelection::All(true))),
        );

        Game {
            id: Game::new_id(),
            piles,
        }
    }

    pub fn id(&self) -> &str {
        self.id.as_str()
    }

    pub fn draw(
        &mut self,
        from: &String,
        to: &String,
        selection: &CardSelection,
    ) -> Result<(), CardAPIError> {
        if (!self.has_pile(from)) {
            return Err(CardAPIError::NotFound(format!("Pile {}", from.clone())));
        }

        if (!self.has_pile(to)) {
            self.new_pile(to.clone());
        }

        let mut p1 = self.get_pile(from).unwrap().borrow_mut();
        let mut p2 = self.get_pile(to).unwrap().borrow_mut();

        p1.draw(&mut p2, selection)
    }

    pub fn new_pile(&mut self, name: String) {
        self.piles.insert(name, RefCell::new(Vec::new()));
    }

    pub fn get_pile(&self, name: &String) -> Option<&RefCell<Cards>> {
        self.piles.get(name)
    }

    pub fn has_pile(&self, name: &String) -> bool {
        self.get_pile(name).is_some()
    }

    fn new_id() -> String {
        use rand::seq::IteratorRandom;
        use rand::thread_rng;

        (0..26)
            .chain(32..58)
            .map(|x| (x + 'A' as u8) as char)
            .choose_multiple(&mut thread_rng(), 12)
            .iter()
            .collect()
    }
}

use rocket_contrib::json::JsonValue;

impl std::convert::Into<JsonValue> for Game {
    fn into(self) -> JsonValue {
        JsonValue::from(serde_json::to_value(self).unwrap())
    }
}

impl models::HasModel for Game {
    type Model = models::Game;

    fn from_model(m: Self::Model) -> Self {
        serde_json::from_str::<Game>(&m.json).unwrap()
    }
    fn to_model(&self) -> Self::Model {
        models::Game {
            id: self.id.clone(),
            json: serde_json::to_string(self).unwrap(),
        }
    }

    fn save(&self, conn: &SqliteConnection) -> QueryResult<usize> {
        use super::schema::games::dsl::*;
        use diesel::dsl::*;

        if select(exists(games.find(self.id.clone()))).get_result(conn)? {
            update(games.find(self.id.clone()))
                .set(self.to_model())
                .execute(conn)
        } else {
            insert_into(games).values(self.to_model()).execute(conn)?;
            Ok(1)
        }
    }

    fn load(conn: &SqliteConnection, id: String) -> QueryResult<Self> {
        use super::schema::games::dsl::games;

        Ok(Self::from_model(
            games.find(id).get_result::<models::Game>(conn)?,
        ))
    }
}
