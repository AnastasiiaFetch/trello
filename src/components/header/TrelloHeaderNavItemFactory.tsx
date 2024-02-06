import BasicSelectItem from '../../elements/custom-select/BasicSelectItem';
import BoardSelectItem from '../../elements/custom-select/BoardSelectItem';
import ExpandedSelectItem from '../../elements/custom-select/ExpandedSelectItem';
import { CustomSelectItemProps } from '../../types/select';

interface TrelloHeaderNavItemFactoryProps {
  type: string;
  element: CustomSelectItemProps;
}

export const TrelloHeaderNavItemFactory: React.FC<TrelloHeaderNavItemFactoryProps> = ({
  type,
  element,
}) => {
  switch (type) {
    case 'create':
      return <ExpandedSelectItem {...element} />;
    case 'selected-boards':
      return <BoardSelectItem {...element} />;
    case 'workspaces':
      return <BasicSelectItem {...element} />;
    default:
      return <>Unknown item type</>;
  }
};
