export default instructions => {
    const newInstructions = instructions.map(({
        id,
        title,
        description,
        isRequired,
        instruction,
        requirement,
        limit,
    }) => {
        const sides = instruction.map(({
            id: sideId,
            title: sideTitle,
            description: sideDescription,
            price: sidePrice,
            calorie: sideCalorie,
            priority,
        }) => ({
            key: sideId,
            primary: sideTitle,
            secondary: (sideCalorie > 0) && `${sideCalorie} Cal.`,
            price: sidePrice,
            priority,
        }));


        let type;
        let min;
        let max;
        if (limit === 1) {
            type = 'radio';
        } else {
            type = 'check';
            if (limit === requirement) {
                max = limit;
                min = limit;
            } else {
                max = limit;
                min = requirement;
            }
        }

        return {
            id,
            type,
            max,
            min,
            items: sides,
            isRequired,
            primary: title,
            secondary: description,
        }
    });


    return newInstructions;
}