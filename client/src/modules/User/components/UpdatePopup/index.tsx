import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Popup from '@components/ui/Popup';
import { useMe } from '@hooks/data';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateProfileValues, useUpdateProfile } from '@hooks/data/useUpdateProfile';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { getHashAvatar } from '@utils/common';

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
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    values: {
      name: me?.name,
      bio: me?.bio,
      avatar: {},
    } as UpdateProfileValues,
    resolver: yupResolver(schema),
  });
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      setValue(
        'avatar',
        Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) }),
      );
    },
  });

  const { updateProfile } = useUpdateProfile(
    () => {
      onHide();
      toast.success('Profile updated successfully');
    },
    () => {
      toast.error('Failed to update profile');
    },
  );

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
        <section className="flex justify-center" {...getRootProps()}>
          <div className="-bottom-[50px] left-8 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-background-200 ring-4 ring-background-200">
            <Image
              className="object-cover"
              alt="avatar"
              height={120}
              width={120}
              src={getValues('avatar')?.preview || me?.avatar || getHashAvatar(me?.id)}
            />
          </div>
          <input {...getInputProps()} />
        </section>
        <Input {...register('name')} label="Name" placeholder="Name" error={errors.name?.message} />
        <Input {...register('bio')} rows={4} label="Bio" placeholder="Bio" />
      </div>
    </Popup>
  );
};

export default UpdatePopup;
