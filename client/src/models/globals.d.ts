declare global {
  interface Navigator {
    getUserMedia: ({}, {}) => void;
    webkitGetUserMedia: ({}, {}) => void;
    mozGetUserMedia: ({}, {}) => void;
  }
}
export {};
