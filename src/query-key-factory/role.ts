const roleKeys = {
    all: ['roles'] as const,
    list: () => [...roleKeys.all, 'list'] as const,
};

export default roleKeys;