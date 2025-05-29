export const APPLICATION_JSON = 'application/json';

export const REQUEST_LIMIT_KB = "2048";

// HTTP Status Codes with Usage Scenarios

// 1xx - Informational
export const CONTINUE = 100; // Client should continue with request (used rarely in APIs)
export const SWITCHING_PROTOCOLS = 101; // Server is switching protocols (e.g., HTTP to WebSocket)
export const PROCESSING = 102; // WebDAV: request received and being processed
export const EARLY_HINTS = 103; // Hints to the client that the final response is coming soon

// 2xx - Success
export const SUCCESS = 200; // Standard response for successful HTTP request
export const CREATED = 201; // Resource successfully created (e.g., POST /users)
export const ACCEPTED = 202; // Request accepted for processing, but not completed yet (e.g., async jobs)
export const NON_AUTHORITATIVE_INFORMATION = 203; // Metadata returned may be from a third-party source
export const NO_CONTENT = 204; // Request was successful but there's no content to send back (e.g., DELETE)
export const RESET_CONTENT = 205; // Tells client to reset the document view (e.g., form submission)
export const PARTIAL_CONTENT = 206; // Used for partial data (e.g., range requests for video/audio)

// 3xx - Redirection
export const MULTIPLE_CHOICES = 300; // Multiple possible responses (rarely used)
export const MOVED_PERMANENTLY = 301; // Resource has been permanently moved (e.g., URL redirect)
export const FOUND = 302; // Temporary redirect (e.g., login redirect)
export const SEE_OTHER = 303; // Redirect to another URL with a GET method (e.g., after POST)
export const NOT_MODIFIED = 304; // Client has cached version (e.g., using ETag headers)
export const TEMPORARY_REDIRECT = 307; // Temporarily redirect with same method (e.g., GET stays GET)
export const PERMANENT_REDIRECT = 308; // Like 301 but method and body must not change

// 4xx - Client Errors
export const BAD_REQUEST = 400; // Malformed request (e.g., missing required fields)
export const UNAUTHORIZED = 401; // Authentication required (e.g., missing/invalid token)
export const PAYMENT_REQUIRED = 402; // Reserved for future use (e.g., paywall APIs)
export const FORBIDDEN = 403; // Authenticated but not allowed (e.g., insufficient permissions)
export const NOT_FOUND = 404; // Resource not found (e.g., invalid ID or URL)
export const METHOD_NOT_ALLOWED = 405; // HTTP method not allowed (e.g., PUT on /login)
export const NOT_ACCEPTABLE = 406; // Requested format not available (e.g., unsupported MIME type)
export const PROXY_AUTHENTICATION_REQUIRED = 407; // Client must authenticate with proxy
export const REQUEST_TIMEOUT = 408; // Client took too long to send request
export const CONFLICT = 409; // Conflict with current state (e.g., duplicate user/email)
export const GONE = 410; // Resource no longer exists (e.g., deleted API endpoint)
export const LENGTH_REQUIRED = 411; // Missing `Content-Length` header
export const PRECONDITION_FAILED = 412; // Preconditions in headers are not met
export const PAYLOAD_TOO_LARGE = 413; // Request body too large (e.g., file upload exceeds limit)
export const URI_TOO_LONG = 414; // URI is too long (e.g., massive query strings)
export const UNSUPPORTED_MEDIA_TYPE = 415; // Content type not supported (e.g., sending XML to JSON endpoint)
export const RANGE_NOT_SATISFIABLE = 416; // Requested range not satisfiable (e.g., file streaming)
export const EXPECTATION_FAILED = 417; // Expect header requirement not met
export const IM_A_TEAPOT = 418; // Easter egg (used for testing/debugging)
export const MISDIRECTED_REQUEST = 421; // Server not able to produce a response
export const UNPROCESSABLE_ENTITY = 422; // Validation error (e.g., schema validation failed)
export const LOCKED = 423; // Resource is locked (e.g., concurrent editing)
export const FAILED_DEPENDENCY = 424; // Dependency failed (e.g., batch request dependency failed)
export const TOO_EARLY = 425; // Premature request (e.g., before handshake completion)
export const UPGRADE_REQUIRED = 426; // Client should switch to a different protocol
export const PRECONDITION_REQUIRED = 428; // Server requires request to be conditional
export const TOO_MANY_REQUESTS = 429; // Rate limit exceeded
export const REQUEST_HEADER_FIELDS_TOO_LARGE = 431; // Header too large (e.g., cookies too big)
export const UNAVAILABLE_FOR_LEGAL_REASONS = 451; // Blocked due to legal reasons (e.g., copyright)

// 5xx - Server Errors
export const INTERNAL_SERVER_ERROR = 500; // Unexpected server error
export const NOT_IMPLEMENTED = 501; // HTTP method not supported by server
export const BAD_GATEWAY = 502; // Server received an invalid response from upstream
export const SERVICE_UNAVAILABLE = 503; // Server is down for maintenance or overloaded
export const GATEWAY_TIMEOUT = 504; // Upstream server did not respond in time
export const HTTP_VERSION_NOT_SUPPORTED = 505; // Server does not support requested HTTP version
export const VARIANT_ALSO_NEGOTIATES = 506; // Content negotiation error
export const INSUFFICIENT_STORAGE = 507; // Server out of storage (e.g., WebDAV)
export const LOOP_DETECTED = 508; // Infinite loop detected in processing
export const NOT_EXTENDED = 510; // Further extensions required to fulfill request
export const NETWORK_AUTHENTICATION_REQUIRED = 511; // Network login required (e.g., captive portal)

