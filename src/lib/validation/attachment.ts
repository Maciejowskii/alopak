import { ALLOWED_ATTACHMENT_TYPES } from "@/lib/validation/quote";

export type AttachmentKind = "pdf" | "jpeg" | "png" | "doc" | "docx";

const KIND_MIME: Record<AttachmentKind, (typeof ALLOWED_ATTACHMENT_TYPES)[number]> = {
  pdf: "application/pdf",
  jpeg: "image/jpeg",
  png: "image/png",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const KIND_EXTENSIONS: Record<AttachmentKind, readonly string[]> = {
  pdf: [".pdf"],
  jpeg: [".jpg", ".jpeg"],
  png: [".png"],
  doc: [".doc"],
  docx: [".docx"],
};

export function detectAttachmentKind(buffer: Buffer): AttachmentKind | null {
  if (buffer.length === 0) return null;

  if (buffer.length >= 4 && buffer.subarray(0, 4).toString("ascii") === "%PDF") {
    return "pdf";
  }

  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpeg";
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "png";
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0xd0 &&
    buffer[1] === 0xcf &&
    buffer[2] === 0x11 &&
    buffer[3] === 0xe0
  ) {
    return "doc";
  }

  if (buffer.length >= 4 && buffer[0] === 0x50 && buffer[1] === 0x4b) {
    return "docx";
  }

  return null;
}

function fileExtension(filename: string): string {
  const normalized = filename.trim().toLowerCase();
  const dot = normalized.lastIndexOf(".");
  if (dot <= 0 || dot === normalized.length - 1) return "";
  return normalized.slice(dot);
}

export function validateAttachmentContent(
  buffer: Buffer,
  declaredMime: string,
  filename: string,
):
  | { ok: true; kind: AttachmentKind; contentType: (typeof ALLOWED_ATTACHMENT_TYPES)[number] }
  | { ok: false; message: string } {
  if (buffer.length === 0) {
    return { ok: false, message: "Załącznik jest pusty." };
  }

  const kind = detectAttachmentKind(buffer);
  if (!kind) {
    return { ok: false, message: "Nie rozpoznano prawidłowego pliku załącznika." };
  }

  const contentType = KIND_MIME[kind];
  if (
    !ALLOWED_ATTACHMENT_TYPES.includes(
      declaredMime as (typeof ALLOWED_ATTACHMENT_TYPES)[number],
    )
  ) {
    return {
      ok: false,
      message: "Niedozwolony typ załącznika.",
    };
  }

  if (declaredMime !== contentType) {
    return {
      ok: false,
      message: "Typ MIME pliku nie odpowiada jego zawartości.",
    };
  }

  const ext = fileExtension(filename);
  if (ext && !KIND_EXTENSIONS[kind].includes(ext)) {
    return {
      ok: false,
      message: "Rozszerzenie pliku nie odpowiada jego zawartości.",
    };
  }

  return { ok: true, kind, contentType };
}
