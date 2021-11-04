package utils;

class ConvertBytes {
	public function new() {}

	/**
	 * bytes to size
	 *
	 * @example     CovertBytes.bytesToSize(111);
	 *
	 * @param bytes
	 */
	public static inline function bytesToSize(bytes:Int) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0)
			return '0 Byte';
		var i = Std.int(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
	}
}
