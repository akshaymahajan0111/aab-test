import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "event": z.object({
        "label": z.string(),
        "target": z.string(),
        "status": z.string()
      }),
      "time": z.object({
        "days": z.string(),
        "hours": z.string(),
        "minutes": z.string(),
        "seconds": z.string()
      }),
      "controls": z.object({
        "pause": z.string(),
        "reset": z.string(),
        "edit": z.string(),
        "settings": z.string()
      }),
      "footer": z.object({
        "timezone": z.string(),
        "mode": z.string(),
        "note": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;