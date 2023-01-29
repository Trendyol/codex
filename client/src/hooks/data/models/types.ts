export type Challenge = {
  id: string;
  name: string;
  question: string;
  status: number;
  teamSize: number;
  participated: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type Participant = {
  id: string;
  name: string;
};

export type Lobby = {
  id: string;
  name: string;
  question: string;
  status: number;
  teamSize: number;
  participants: Participant[];
  date: string;
};

export type Room = {
  id: string;
  name: string;
  question: string;
  status: number;
  teamSize: number;
  team: {
    id: string;
    participants: Participant[];
  };
  date: string;
};
