using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRMConnect.Server.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    AdminId = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Name = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Email = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Password = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.AdminId);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    CustomerId = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Name = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Email = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Phone = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Address = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Gender = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Industry = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.CustomerId);
                });

            migrationBuilder.CreateTable(
                name: "SalesRepresentatives",
                columns: table => new
                {
                    SalesRepId = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Name = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Email = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Phone = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Password = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesRepresentatives", x => x.SalesRepId);
                });

            migrationBuilder.CreateTable(
                name: "Mails",
                columns: table => new
                {
                    MailId = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Subject = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Body = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    SentAt = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    SalesRepId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    SalesRepresentativeSalesRepId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CustomerId = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mails", x => x.MailId);
                    table.ForeignKey(
                        name: "FK_Mails_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId");
                    table.ForeignKey(
                        name: "FK_Mails_SalesRepresentatives_SalesRepresentativeSalesRepId",
                        column: x => x.SalesRepresentativeSalesRepId,
                        principalTable: "SalesRepresentatives",
                        principalColumn: "SalesRepId");
                });

            migrationBuilder.CreateTable(
                name: "Sales",
                columns: table => new
                {
                    SaleId = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    ProductName = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    SaleAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SaleDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    SalesRepId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    SalesRepresentativeSalesRepId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    CustomerId = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sales", x => x.SaleId);
                    table.ForeignKey(
                        name: "FK_Sales_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId");
                    table.ForeignKey(
                        name: "FK_Sales_SalesRepresentatives_SalesRepresentativeSalesRepId",
                        column: x => x.SalesRepresentativeSalesRepId,
                        principalTable: "SalesRepresentatives",
                        principalColumn: "SalesRepId");
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    TaskId = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    TaskDescription = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    DueDate = table.Column<DateTime>(type: "TIMESTAMP(7)", nullable: false),
                    Status = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    SalesRepId = table.Column<int>(type: "NUMBER(10)", nullable: true),
                    SalesRepresentativeSalesRepId = table.Column<int>(type: "NUMBER(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.TaskId);
                    table.ForeignKey(
                        name: "FK_Tasks_SalesRepresentatives_SalesRepresentativeSalesRepId",
                        column: x => x.SalesRepresentativeSalesRepId,
                        principalTable: "SalesRepresentatives",
                        principalColumn: "SalesRepId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mails_CustomerId",
                table: "Mails",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Mails_SalesRepresentativeSalesRepId",
                table: "Mails",
                column: "SalesRepresentativeSalesRepId");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_CustomerId",
                table: "Sales",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_SalesRepresentativeSalesRepId",
                table: "Sales",
                column: "SalesRepresentativeSalesRepId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_SalesRepresentativeSalesRepId",
                table: "Tasks",
                column: "SalesRepresentativeSalesRepId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "Mails");

            migrationBuilder.DropTable(
                name: "Sales");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "SalesRepresentatives");
        }
    }
}
