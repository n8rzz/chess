import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<!doctype html><html><body></body></html>');

// Save these two objects in the global space so that libraries/tests
// can hook into them, using the above doc definition.
(global as any).document = window.document;
(global as any).window = window;
