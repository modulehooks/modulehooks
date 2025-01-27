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
import fs from 'node:fs/promises';
import type { ResolveHookContext } from 'node:module';
import { describe, it, mock } from 'node:test';

import { resolve } from './hook.js';
import extensions from './json/extensions.json' with { type: 'json' };

describe(resolve.name, () => {
  function assertDefaultModuleResolved(
    mockSpecifier: string,
    mockNextResolve: ReturnType<typeof mock['fn']>
  ) {
    assert.ok(mockNextResolve.mock.callCount(), 'module was never resolved');
    const [ mockNextResolveCall ] = mockNextResolve.mock.calls;
    const [ mockNextResolveCallSpecifier ] = mockNextResolveCall.arguments;
    assert.strictEqual(
      mockNextResolveCallSpecifier,
      mockSpecifier,
      'module was resolved with a different specifier than the default'
    );
  }

  it('should not resolve a module with a file extension specified', () => {
    const mockSpecifier = 'file:///path/to/module.js';
    const mockContext: ResolveHookContext = {
      conditions: [ 'import' ],
      importAttributes: null,
      parentURL: null
    };
    const mockNextResolve = mock.fn();
    resolve(mockSpecifier, mockContext, mockNextResolve);
    assertDefaultModuleResolved(mockSpecifier, mockNextResolve);
  });

  it('should not resolve a module without a import', () => {
    const mockSpecifier = 'file:///path/to/module';
    const mockContext: ResolveHookContext = {
      conditions: [],
      importAttributes: null,
      parentURL: null
    };
    const mockNextResolve = mock.fn();
    resolve(mockSpecifier, mockContext, mockNextResolve);
    assertDefaultModuleResolved(mockSpecifier, mockNextResolve);
  });

  for (const extension of extensions) {
    it(`should resolve a ${extension} module without a file extension`, async () => {
      const mockSpecifier = 'file:///path/to/module';
      const mockContext: ResolveHookContext = {
        conditions: [ 'import' ],
        importAttributes: null,
        parentURL: null
      };
      const mockNextResolve = mock.fn();
      mock.method(fs, 'access', path =>
        path === mockSpecifier + extension ?
          Promise.resolve() : Promise.reject()
      );
      await resolve(mockSpecifier, mockContext, mockNextResolve);
      assert.ok(mockNextResolve.mock.callCount(), 'module was never resolved');
      const [ mockNextResolveCall ] = mockNextResolve.mock.calls;
      const [ mockNextResolveCallSpecifier ] = mockNextResolveCall.arguments;
      assert.strictEqual(
        mockNextResolveCallSpecifier,
        mockSpecifier + extension,
        'module was not resolved with the correct extension'
      );
    });
  }
});
