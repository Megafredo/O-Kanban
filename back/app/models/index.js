import { User } from './user.js';
import { List } from './list.js';
import { Tag } from './tag.js';
import { Card } from './card.js';

//~ ---------------------------- USER - LIST
User.hasMany(List,{
    foreignKey : 'user_id',
    as: 'lists'
})

List.belongsTo(User,{
    foreignKey: 'user_id',
    as: 'user'
})

//~ ---------------------------- USER - CARD
User.hasMany(Card,{
    foreignKey: 'user_id',
    as : 'cards'
})

Card.belongsTo(User,{
    foreignKey: 'user_id',
    as : 'user'
})

//~ ---------------------------- CARD - LIST
List.hasMany(Card,{
    foreignKey: 'list_id',
    as: 'cards'
})

Card.belongsTo(List, {
    foreignKey: 'list_id',
    as: 'list'
})

//~ ---------------------------- CARD_HAS_TAG
Card.belongsToMany(Tag, {
    foreignKey: 'card_id',
    through: 'card_has_tag',
    otherKey: 'tag_id',
    as: 'tags'
})

Tag.belongsToMany(Card, {
    foreignKey: 'tag_id',
    through: 'card_has_tag',
    otherKey: 'card_id',
    as: 'cards'
})

export {User, List, Tag, Card};