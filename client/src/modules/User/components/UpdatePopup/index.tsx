import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Popup from '@components/ui/Popup';
import { useMe } from '@hooks/data';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateProfile } from '@hooks/data/useUpdateProfile';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

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
      avatar: {} as any,
    },
    resolver: yupResolver(schema),
  });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setValue(
        'avatar',
        acceptedFiles[0]
      );
    },
  });
  const avatar = me && `https://avatars.dicebear.com/api/avataaars/${me.id}.svg`;

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
      <section {...getRootProps({ className: 'dropzone disabled flex justify-center' })}>
        {
          <Image
            priority
            className="-bottom-[50px] left-8 flex items-center justify-center rounded-full bg-error ring-4 ring-background-200"
            alt="avatar"
            height={120}
            width={120}
            src={  me?.avatar || ''}
          />
        }
        <input {...getInputProps()} />
      </section>
      <div className="space-y-6">
        <Input {...register('name')} label="Name" placeholder="Name" error={errors.name?.message} />
        <Input {...register('bio')} rows={4} label="Bio" placeholder="Bio" />
      </div>
    </Popup>
  );
};

export default UpdatePopup;
