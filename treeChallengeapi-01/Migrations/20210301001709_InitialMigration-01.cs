using Microsoft.EntityFrameworkCore.Migrations;

namespace treeChallengeapi_01.Migrations
{
    public partial class InitialMigration01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Factory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Factory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChildNode",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FactoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChildNode", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChildNode_Factory_FactoryId",
                        column: x => x.FactoryId,
                        principalTable: "Factory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChildNode_FactoryId",
                table: "ChildNode",
                column: "FactoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChildNode");

            migrationBuilder.DropTable(
                name: "Factory");
        }
    }
}
