export async function DELETE(request, { params }) {
  const { id } = params;
  console.log("Deleting user with ID:", id); // ログを追加

  await connectMongoDB();

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 } // 404 Not Found
      );
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Failed to delete user", error: error.message },
      { status: 500 }
    );
  }
}
