export type Filter = {
  selected: string | string[];
  variants: string[];
  type: 'one' | 'many';
  order: number;
};

type Props = (
  filters: any,
  initTree: any,
  selectedKey: string,
  selectedValue: string | string[],
) => { [key: string]: Filter };

const buildInitialTree = (filters: any, initOrder: number = 0) => {
  const initialTree: { [key: string]: Filter } = {};

  const iter = (node: any, order: number): { [key: string]: Filter } => {
    if (Object.keys(node).length === 0) {
      return initialTree;
    }

    if ('static' in node) {
      let staticOrder = order;
      node.static.forEach((filter: any) => {
        initialTree[filter.name] = {
          selected:
            filter.type === 'one' ? filter.variants[0] : [filter.variants[0]],
          variants: filter.variants,
          type: filter.type,
          order: staticOrder,
        };
        staticOrder += 1;
      });

      return initialTree;
    }

    const { variants, name } = node;

    const keys = Object.keys(variants);
    const firstKey = keys[0];
    initialTree[name] = {
      selected: firstKey,
      variants: keys,
      type: 'one',
      order,
    };

    return iter(variants[firstKey], order + 1);
  };

  return iter(filters, initOrder);
};

const buildEditedTree: Props = (
  filters,
  initTree,
  selectedKey,
  selectedValue,
) => {
  const tree: { [key: string]: Filter } = initTree;

  const iter = (node: any, order: number): { [key: string]: Filter } => {
    if (Object.keys(node).length === 0) {
      return {};
    }

    if ('static' in node) {
      const editedStaticProp = node.static.find(
        (prop: any) => prop.name === selectedKey,
      );

      if (editedStaticProp) {
        tree[selectedKey] = {
          selected: selectedValue,
          variants: tree[selectedKey].variants,
          type: tree[selectedKey].type,
          order: tree[selectedKey].order,
        };

        return tree;
      }
      return {};
    }

    const { name, variants } = node;
    const keys = Object.keys(variants);

    if (name === selectedKey) {
      tree[selectedKey] = {
        selected: selectedValue,
        variants: keys,
        type: 'one',
        order,
      };

      const unactualKeys = Object.entries(tree)
        .filter(([_paramKey, paramValue]) => paramValue.order > order)
        .map(([key]) => key);

      unactualKeys.forEach((key) => {
        delete tree[key];
      });

      const childrenTree = buildInitialTree(
        variants[selectedValue as string],
        order + 1,
      );

      return { ...tree, ...childrenTree };
    }

    return keys.reduce(
      (acc, key: any) => ({
        ...acc,
        ...iter(variants[key], order + 1),
      }),
      {},
    );
  };

  return iter(filters, 0);
};

export const renderFilterState = (
  categoryFilters: any,
  initTree: any = {},
  selectedKey: string | null = null,
  selectedValue: string | string[] | null = null,
) => {
  if (!selectedKey && !selectedValue) {
    return buildInitialTree(categoryFilters);
  }
  return buildEditedTree(
    categoryFilters,
    initTree,
    selectedKey as string,
    selectedValue as string | string[],
  );
};
