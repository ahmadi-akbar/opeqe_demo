import {
    createSelector
} from 'reselect';

export default createSelector(
    [
        state => state.demo.ban
    ],
    ban => transform(ban),
)




const transform = ban => {
    let isBanned = false;
    for (const banType in ban) {
        isBanned |= ban[banType];
    }

    return {
        ...ban,
        isBanned
    }
}