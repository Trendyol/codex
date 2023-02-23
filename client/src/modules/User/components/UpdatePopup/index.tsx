import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Popup from '@components/ui/Popup';
import { useMe } from '@hooks/data';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateProfile } from '@hooks/data/useUpdateProfile';
import { toast } from 'react-toastify';

type UpdatePopupProps = {
  show: boolean;
  onHide: () => void;
};

const schema = yup
  .object({
    name: yup.string().required(),
    bio: yup.string(),
  })
  .required();

const UpdatePopup: FC<UpdatePopupProps> = ({ show, onHide }) => {
  const { me } = useMe();

  const { updateProfile } = useUpdateProfile(
    () => {
      onHide();
      toast.success('Profile updated successfully');
    },
    () => {
      toast.error('Failed to update profile');
    },
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: me?.name,
      bio: me?.bio,
    },
    resolver: yupResolver(schema),
  });
  return (
    <Popup
      show={show}
      onHide={onHide}
      title="Update Profile"
      footer={
        <div className="w-full">
          <Button
            className="float-right"
            onClick={handleSubmit((data) => updateProfile({ id: me?.id, data }))}
          >
            Save
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Input {...register('name')} label="Name" placeholder="Name" error={errors.name?.message} />
        <Input {...register('bio')} rows={4} label="Bio" placeholder="Bio" />
      </div>
    </Popup>
  );
};

export default UpdatePopup;
