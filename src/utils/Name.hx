package utils;

class Name {
	public function new() {}

	public static inline function getName(name) {
		return Type.getClassName(Type.getClass(name));
	}
}
