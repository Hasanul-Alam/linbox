export type MediaType = "image" | "video" | "document" | null;

export interface SelectedMedia {
  type: MediaType;
  uri: string;
  preview?: string;
  name?: string;
  size?: number;
  duration?: number;
}

export interface Message {
  id: number;
  type: "text" | "image" | "video" | "document";
  text?: string;
  fromContact: boolean;
  time: string;
  status: "sent" | "delivered" | "read" | "failed";
  uri?: string;
  fileName?: string;
  fileSize?: string | number;
  duration?: number;
  imageUrl?: string;
}

export interface Contact {
  id: string;
  name: string;
  whatsappNumber: string;
  pinned: boolean;
  labels: {
    data: { color: string }[];
  };
}
