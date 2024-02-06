import { HStack, Text } from '@chakra-ui/react';
import LabelsBar from '../../common/LabelsBar/LabelsBar';
import { Label } from '../../../types/label';
import { ModalBodyWrapper } from '.';

interface CreateLabelModalBodyProps {
  initialLabels: Label[];
  onValueSave: (value: any) => void;
}

export const CreateLabelModalBody: React.FC<CreateLabelModalBodyProps> = ({
  initialLabels = [],
  onValueSave = () => {},
}) => {
  return (
    <ModalBodyWrapper>
      <HStack>
        <Text fontWeight={'semibold'}>Мітки</Text>
      </HStack>
      <LabelsBar initialLabels={initialLabels} onSelectLabels={onValueSave} />
    </ModalBodyWrapper>
  );
};
