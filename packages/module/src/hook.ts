/*
 * Copyright 2025 Mark Auger
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import fs from 'node:fs/promises';
import type { ResolveHook } from 'node:module';
import path from 'node:path';
import url from 'node:url';

import extensions from './json/extensions.json' with { type: 'json' };

export const resolve: ResolveHook = async (specifier, context, nextResolve) => {
  if (!path.extname(specifier) && context.conditions.includes('import')) {
    await Promise.any(extensions.map(extension =>
      fs.access(
        url.fileURLToPath(
          path.join(path.dirname(context.parentURL), specifier + extension)
        )
      ).then(() => specifier += extension)
    ));
  }
  return nextResolve(specifier, context);
};
