use super::*;

use std::slice::Iter;

use serde::de::{Deserialize, Deserializer, SeqAccess, Visitor};
use serde::ser::{Serialize, SerializeSeq, Serializer};

pub trait CardCollection {
    fn draw(&mut self, into: &mut Self, selection: &CardSelection) -> Result<(), CardAPIError>;
}

impl CardCollection for Vec<Card> {
    fn draw(&mut self, into: &mut Self, selection: &CardSelection) -> Result<(), CardAPIError> {
        let mut to_draw = selection.select_from(&self)?;

        if self.iter().filter(|c| to_draw.contains(c)).count() == to_draw.len()
            && into.iter().filter(|c| to_draw.contains(c)).count() == 0
        {
            self.retain(|c| !to_draw.contains(&c));
            into.append(&mut to_draw);
        }

        println!("Made it...");
        Ok(())
    }
}

impl From<CardSelection> for Vec<Card> {
    fn from(selection: CardSelection) -> Self {
        selection.select_from(&ALL_CARDS()).unwrap()
    }
}
