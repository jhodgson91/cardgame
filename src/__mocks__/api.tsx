export const mockDeck = jest.fn();
const mock = jest.fn().mockImplementation(() => {
    const deck = {"remaining": 52, "success": true, "deck_id": "atyv1j5ojmum", "shuffled": false};
    return(deck);
});

export default mock;