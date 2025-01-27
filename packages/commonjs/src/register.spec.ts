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
import assert from 'node:assert';
import module from 'node:module';
import { describe, it, mock } from 'node:test';

// @ts-ignore - @types/node is missing type definitions
describe(module.registerHooks.name, () => {
  it('should register a hook', async () => {
    // @ts-ignore - @types/node is missing type definitions
    const mockRegisterHooks = mock.method(module, 'registerHooks');
    await import('./register.js');
    assert.ok(mockRegisterHooks.mock.callCount(), 'no hook was registered');
  });
});
