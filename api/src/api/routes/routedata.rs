use super::CardSelection;

use std::collections::HashMap;

use serde::Deserialize;

pub type InitData = HashMap<String, CardSelection>;

#[derive(Deserialize)]
pub struct DrawData {
    pub(super) source: String,
    pub(super) selection: CardSelection,
}
