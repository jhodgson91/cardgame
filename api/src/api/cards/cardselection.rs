use super::*;

use rand::seq::SliceRandom;
use rand::thread_rng;

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(rename_all = "lowercase")]
pub enum CardSelection {
    Empty,
    All(bool),
    Top(usize),
    Bottom(usize),
    Random(usize),
    Filter {
        #[serde(default)]
        suits: Vec<CardSuit>,
        #[serde(default)]
        values: Vec<CardValue>,
    },
    Cards(Cards),
}

impl CardSelection {
    pub fn select_from(&self, from: &Cards) -> Result<Cards, CardAPIError> {
        use CardSelection::*;
        match self {
            Empty => Ok(Vec::new()),
            All(shuffle) => {
                if *shuffle {
                    CardSelection::select_random(from, &from.len())
                } else {
                    Ok(from.clone())
                }
            }
            Random(n) => CardSelection::select_random(from, n),
            Top(n) => CardSelection::select_top(from, n),
            Bottom(n) => CardSelection::select_bottom(from, n),
            Filter { suits, values } => CardSelection::select_filter(from, suits, values),
            Cards(cards) => CardSelection::select_cards(from, cards),
        }        
    }

    fn select_random(from: &Cards, n: &usize) -> Result<Cards, CardAPIError> {
        use rand::seq::SliceRandom;
        use rand::thread_rng;

        if *n <= from.len() {
            Ok(from
                .as_slice()
                .choose_multiple(&mut thread_rng(), *n)
                .cloned()
                .collect())
        } else {
            Err(CardAPIError::NotEnoughCards)
        }
    }

    fn select_top(from: &Cards, n: &usize) -> Result<Cards, CardAPIError> {
        if (*n <= from.len()) {
            let start = if *n > from.len() { 0 } else { from.len() - n };
            Ok(from[start..].to_vec())
        } else {
            Err(CardAPIError::NotEnoughCards)
        }
    }

    fn select_bottom(from: &Cards, n: &usize) -> Result<Cards, CardAPIError> {
        if *n < from.len() {
            let end = std::cmp::min(*n, from.len());
            Ok(from[..end].to_vec())
        } else {
            Err(CardAPIError::NotEnoughCards)
        }
    }

    fn select_filter(
        from: &Cards,
        suits: &Vec<CardSuit>,
        values: &Vec<CardValue>,
    ) -> Result<Cards, CardAPIError> {
        let test_suit = |c: &Card| suits.len() == 0 || suits.contains(&c.suit);
        let test_value = |c: &Card| values.len() == 0 || values.contains(&c.value);

        let expected = suits.len() * values.len();

        let filtered = from.iter().filter(|&c| test_suit(c) && test_value(c));

        if filtered.clone().count() >= expected {
            Ok(filtered.cloned().collect())
        } else {
            Err(CardAPIError::CardNotInCollection)
        }
    }

    fn select_cards(from: &Cards, cards: &Cards) -> Result<Cards, CardAPIError> {
        let mut result = Vec::new();
        for card in cards {
            if from.contains(card) {
                result.push(*card);
            } else {
                return Err(CardAPIError::CardNotInCollection);
            }
        }
        Ok(result)
    }
}